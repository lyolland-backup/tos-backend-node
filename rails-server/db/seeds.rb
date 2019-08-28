# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create!([
    { username: "456", password: "456", usertype: true },
    { username: "789", password: "789", usertype: true },
    { username: "000", password: "000", usertype: true }
    ])

# Paper.create!([
#     { title: "a new paper", abstract: "some text about how great this paper is"},
#     { title: "another new paper", abstract: "cool stuff in here"},
#     { title: "a paper again", abstract: "this paper is about some things"},
#     ])

# UserPaper.create!([
#     {user_id: 1, paper_id: 1},
#     {user_id: 1, paper_id: 2},
#     {user_id: 1, paper_id: 3}
#     ])

# Review.create!([
#     {content: "this paper is great", user_id: 1, paper_id: 1}
#     ])