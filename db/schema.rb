# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_04_27_041924) do
  create_table "settings", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.integer "work_minute", default: 25, null: false
    t.integer "work_second", default: 0, null: false
    t.boolean "automatic_work_start", default: true, null: false
    t.integer "short_break_minute", default: 5, null: false
    t.integer "short_break_second", default: 0, null: false
    t.integer "long_break_minute", default: 15, null: false
    t.integer "long_break_second", default: 0, null: false
    t.integer "work_interval", default: 4, null: false
    t.boolean "automatic_break_start", default: true, null: false
    t.boolean "sound_notification", default: true, null: false
    t.string "start_message1", default: "集中1！", null: false
    t.string "start_message2", default: "集中2！", null: false
    t.string "start_message3", default: "集中3！", null: false
    t.boolean "display_message", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.string "theme"
    t.index ["user_id"], name: "index_settings_on_user_id"
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "settings", "users"
end
