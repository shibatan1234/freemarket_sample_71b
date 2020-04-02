Rails.application.routes.draw do

  get 'purchase/index'
  get 'purchase/done'

  root to: 'products#index'

  resources :card, only: [:new, :show] do
  collection do
    post 'show', to: 'card#show'
    post 'pay', to: 'card#pay'
    post 'delete', to: 'card#delete'
  end
end

  devise_for :users, controllers: {
    registrations: 'users/registrations',
  }
  devise_scope :user do
    get 'addresses', to: 'users/registrations#new_address'
    post 'addresses', to: 'users/registrations#create_address'
  end

  root to: 'products#index'

  # resources :purchase, only: [:show,:update] do
  #   collection do
  #     post 'show', to: 'purchase#show'
  #     post 'pay', to: 'purchase#pay'
  #     get 'done', to: 'purchase#done'
      
  #   end
  # end
  
  

  
  resources :users

  resources :card, only: [:new, :show] do
    collection do
      post 'show', to: 'card#show'
      post 'pay', to: 'card#pay'
      post 'delete', to: 'card#delete'
    end
end

  resources :products do
    collection do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
      get 'get_deliverywayonSeller', defaults: { format: 'json' }
      get 'get_deliverywayonBuyer', defaults: { format: 'json' }
    end
    resources :purchase, only: [:index,:update] do
      collection do
        post 'pay', to: 'purchase#pay'
        get 'done', to: 'purchase#done'
        
      end
    end
  end
end

