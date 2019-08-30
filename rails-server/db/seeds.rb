# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)





# User.create!([
#     { username: "lawrence", password: "123", usertype: true, bio: "i like to study xyz" },
#     { username: "123", password: "123", usertype: true, bio: "xyz is good"  },
#     { username: "456", password: "456", usertype: false, bio: "this is my bio"  },
#     { username: "789", password: "789", usertype: false, bio: "" },
#     { username: "000", password: "000", usertype: false, bio: "" }
#     ])

Paper.create!([
    { title: "title of paper", abstract: "here's another paper with some content", user_id: 1, category: "Biology"}
    ])


# Review.create!([
#     {content: "this paper is great", user_id: 1, paper_id: 1}
#     ])