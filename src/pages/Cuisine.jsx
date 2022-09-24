import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {
	const [cuisine, setCuisine] = useState([]);
	const params = useParams();

	const getCuisine = async (name) => {
		const res = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_APIKEY}&cuisine=${name}`
		);
		const recipes = await res.json();
		setCuisine(recipes.results);
	};

	useEffect(() => {
		getCuisine(params.id);
	}, [params]);

	return (
		<Grid animate={{opacity:1}}
		initial={{opcaity:0}}
		exit={{opacity:0}}
		transition={{duration:0.5}}
		>
			{cuisine.map((item) => {
				return (
					<Card key={item.id}>
						<Link to={'/recipe/' + item.id}>
							<img src={item.image} alt='item.title' />
							<h4>{item.title}</h4>
						</Link>
					</Card>
				);
			})}
		</Grid>
	);
}

const Grid = styled(motion.div)`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	grid-gap: 3rem;
`;

const Card = styled.div`
	img {
		width: 1005;
		border-radius: 2rem;
	}

	a {
		text-decoration: none;
	}

	h4 {
		text-align: center;
		padding: 1rem;
	}
`;

export default Cuisine;
