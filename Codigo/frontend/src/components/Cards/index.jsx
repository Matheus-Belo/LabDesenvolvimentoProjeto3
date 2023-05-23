import { ColorTokens } from "../../theme";
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography   } from "@mui/material";
import Header from "../../components/Header/Header";


const Cards = () => {

    const Compra = () => {
        console.log("Comprar");
    }


    return(
            <Card 
                sx={{ 
                    maxWidth: 345,
                    boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.75)",
                    borderRadius: "10px",
                }}
            >
                <CardMedia
                    sx={{ height: 140 }}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" sx={{width: "100%"}} onClick={Compra}>Comprar</Button>
                </CardActions>
            </Card>
    )
}

export default Cards;