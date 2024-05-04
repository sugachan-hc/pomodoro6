class AddForeignKeyToSettings < ActiveRecord::Migration[7.1]
  def change
    add_reference :settings, :user, null: false, foreign_key: true
  end
end
