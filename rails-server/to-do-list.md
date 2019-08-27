### Things to do in rails...

- [] set up user model
    - [] relationships
    - [x] account validations
        - [x] username (uniqueness, case sensitive)
        - [x] password (min length)

- [x] build schema
    - [x] username
    - [x] password (hashed)
    - [x] type

- [x] set up basic routes

- [x] set up controllers
    - [x] application controller
        - [x] get token (request headers)
        - [x] encode token - JWT.encode
        - [x] decode token- JWT.decode
        - [x] is logged in?
        - [x] set current user

    - [x] user controller
        - [x] index - render json
        - [] show - render json
        - [x] create - render json

    - [x] auth controller 
        - [x] create 
        - [x] validate token

- [x] set up user serializer (fast json serializer)
