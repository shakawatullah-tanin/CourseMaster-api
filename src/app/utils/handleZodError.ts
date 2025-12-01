
export const handleZodError = (err: any): any => {
    const errorSources: any = [];


    err.issues.forEach((issue: any) => {
        errorSources.push({
            path: issue.path[issue.path.length - 1],
            message: issue.message
        })
    });

    return {
        statusCode: 400,
        message: "zod Error",
        errorSources
    }
};