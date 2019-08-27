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

- [] set up basic routes

- [] set up controllers
    - [] application controller
        - [] get token (request headers)
        - [] encode token - JWT.encode
        - [] decode token- JWT.decode
        - [] is logged in?
        - [] set current user

    - [] user controller
        - [] index - render json
        - [] show - render json
        - [] create - render json

    - [] auth controller 
        - [] create 
        - [] validate token

- [] set up user serializer (fast json serializer)
