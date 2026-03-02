import { FastifyInstance } from "fastify";
import { getProductionSuggestion } from "../controller/productionSuggestion";


export async function suggestionRoutes(app: FastifyInstance) {

    app.get('/',getProductionSuggestion )

}