class RemoveMessageNotificationToSettings < ActiveRecord::Migration[7.1]
  def change
    remove_column :settings, :message_notification
  end
end
