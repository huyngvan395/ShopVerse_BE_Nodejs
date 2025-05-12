const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const statusCode = res.statusCode ? res.statusCode : 500;
    const message = err.message ? err.message : "Internal Server Error";

    res.status(statusCode).json({
        error: {
            message,
            ...process.env.NODE_ENV === "development" && {stack : err.stack}
        }
    })
}

export default errorHandler;