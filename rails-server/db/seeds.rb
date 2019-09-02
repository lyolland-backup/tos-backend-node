# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([
    { username: "lawrence", password: "123", usertype: true, bio: Faker::Movies::Ghostbusters.quote },
    { username: "peer", password: "123", usertype: false, bio: Faker::Movies::Ghostbusters.quote },
    ])


10.times do 
    Paper.create({
        title: Faker::Hipster.sentence,
        abstract: Faker::Hipster.paragraph(sentence_count: 3),
        category: ["Biology", "Physics", "Chemistry"][rand(3)],
        doi: "10.1016/j.cell.2015.02.015",
        user_id: 1
    })
end 

5.times do 
    Review.create({
        content: Faker::Hipster.paragraph(sentence_count: 2),
        paper_id: 1,
        user_id: 1
    })
end 
