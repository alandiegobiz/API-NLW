import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {
    //http://localhost:3333/answers/2?u=d4a030c0-23c5-4001-adaa-9a690a9b5eee
    /*
        Route Params => Parametros que compõe a rota / 
        routes.get("/answers/:value/:1")

        Query Params => Busca, Paginacao, não obrigatórios
        ?
        chave=valor
    */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser) {
            throw new AppError("Survey User does not exists!")
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser)
    }
}


export {AnswerController};