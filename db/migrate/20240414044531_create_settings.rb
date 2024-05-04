class CreateSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :settings do |t|
      t.integer :work_minute, null: false, default: 25             #１作業（１ポモドーロ）の長さ(分)
      t.integer :work_second, null: false, default: 0              #同上(秒)
      t.boolean :automatic_work_start, null: false, default: true  #作業時間になったら自動で開始するか否か

      t.integer :short_break_minute, null: false, default: 5       #短い休憩時間の長さ(分)
      t.integer :short_break_second, null: false, default: 0       #同上(秒)

      t.integer :long_break_minute, null: false, default: 15       #長い休憩時間の長さ(分)
      t.integer :long_break_second, null: false, default: 0        #同上(秒)
      
      t.integer :work_interval, null: false, default: 4            #長い休憩まで何回作業するか？
      t.boolean :automatic_break_start, null: false, default: true #休憩時間になったら自動で開始するか否か

      t.boolean :sound_notification, null: false, default: true    #通知音を鳴動するか否か

      t.string :start_message1, null: false, default: "集中1！"    #応援メッセージ1
      t.string :start_message2, null: false, default: "集中2！"    #応援メッセージ2
      t.string :start_message3, null: false, default: "集中3！"    #応援メッセージ3
      t.boolean :display_message, null: false, default: true       #応援メッセージを表示するか否か

      t.timestamps
    end
  end
end
