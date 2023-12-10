exports.userSignupValidator = function (req, res,next){
    req.check("username","username is required").notEmpty()
    req.check("email","Email must be between 4 and 32 charecters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must cointain @")
    .isLength({
        min : 4,
        max : 32
    })
    req.check("password", "Password is required").notEmpty()
    req.check("password", ).isLength({
        min : 6
    })
    .withMessage("Password must contain at least 6 charecters")
    .matches(/\d/)
    .withMessage("Password must contain a number")


    req.check("address","address is required").notEmpty()


    req.check("phone","phone is required").notEmpty()

    req.check("gender","gender is required").notEmpty()

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error : firstError
        })

    }
    next()
}


exports.employeeSignupValidator = function (req, res,next){
    req.check("name","name is required").notEmpty()
    req.check("email","Email must be between 4 and 32 charecters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must cointain @")
    .isLength({
        min : 4,
        max : 32
    })
    req.check("password", "Password is required").notEmpty()
    req.check("password", ).isLength({
        min : 6
    })
    .withMessage("Password must contain at least 6 charecters")
    .matches(/\d/)
    .withMessage("Password must contain a number")


   

    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error : firstError
        })

    }
    next()
}

exports.projectSignupValidator =  function (req, res,next){
    req.check("name","name is required").notEmpty()
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error : firstError
        })

    }
    next()

}

exports.taskSignupValidator = function (req, res, next){
    req.check("name","name is required").notEmpty()
    const errors = req.validationErrors()
    if(errors){
        const firstError = errors.map(error=>error.msg)[0];
        return res.status(400).json({
            error : firstError
        })

    }
    next()
}