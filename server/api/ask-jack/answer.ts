import { defineEventHandler, useBody, useCookie } from "h3";
import { createAnswer } from "~/server/database/repositories/askJackRespository";
import { getUserBySessionToken } from '~/server/services/sessionService'

export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const data: IAnswerPost = body.data

    const authToken = useCookie(event, 'auth_token')  
    const user  = await getUserBySessionToken(authToken)

    return await createAnswer(data, user.id)
})