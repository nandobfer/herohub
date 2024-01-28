export const post = async (url: string, data: any) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data)
        })

        return response.json()
    } catch (error) {
        throw error
    }
}

export const get = async (url: string) =>
    (
        await fetch(url, {
            method: "GET"
        })
    ).json()
