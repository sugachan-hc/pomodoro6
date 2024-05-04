Rails.application.routes.draw do
  root "top#index"
  devise_for :users
  # devise_for :users, controllers: { registrations: 'users/registrations' }

  resources :settings
  
  get "up" => "rails/health#show", as: :rails_health_check
end
