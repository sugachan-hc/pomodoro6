class AddThemeToSettings < ActiveRecord::Migration[7.1]
  def change
    add_column :settings, :theme, :string
  end
end
