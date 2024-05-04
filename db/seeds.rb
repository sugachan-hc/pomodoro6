# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Setting.create!(
#   work_minute: 25,
#   work_second: 0,
#   automatic_work_start: true,
#   short_break_minute: 5,
#   short_break_second: 0,
#   long_break_minute: 15,
#   long_break_second: 0,
#   work_interval: 4,
#   automatic_break_start: true,
#   sound_notification: true,
#   start_message1: "集中11",
#   start_message2: "集中22",
#   start_message3: "集中33",
#   display_message: true,
#   user_id: 1
# )

User.create!(
  email: "sugada1@example.com",
  password: "pipo1328"
)

Setting.create!(
  work_minute: 0,
  work_second: 10,
  automatic_work_start: true,
  short_break_minute: 5,
  short_break_second: 0,
  long_break_minute: 15,
  long_break_second: 0,
  work_interval: 4,
  automatic_break_start: true,
  sound_notification: true,
  start_message1: "aaa",
  start_message2: "bbb",
  start_message3: "やるぜー",
  display_message: true,
  user_id: 1,
  theme: "option1.jpg"
)
