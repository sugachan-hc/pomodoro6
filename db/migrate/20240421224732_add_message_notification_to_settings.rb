class AddMessageNotificationToSettings < ActiveRecord::Migration[7.1]
  def change
    add_column :settings, :message_notification, :boolean, null: false, default: true  # メッセージを表示するか否か
  end
end
