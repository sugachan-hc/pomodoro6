module ApplicationHelper
  def asset_directory_path(asset)
    File.dirname(asset_path(asset))
  end
end
