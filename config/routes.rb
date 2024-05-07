Rails.application.routes.draw do
  root "top#index"
  devise_for :users

  resources :settings, only: %i[update]
  
  get "up" => "rails/health#show", as: :rails_health_check
end
