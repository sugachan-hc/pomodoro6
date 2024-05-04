class RemoveDefaultFromDisplUayMessage < ActiveRecord::Migration[7.1]
  def change
    change_column_default :settings, :display_message, nil
  end
end
