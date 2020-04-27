module Admin
  class SessionsController < ActiveAdmin::Devise::SessionsController

    def create
      resource = User.find_for_database_authentication(email: params[:user][:email])

      if resource.valid_password?(params[:user][:password])
        sign_in("user", resource)

        case params[:context]
        when 'home_page_prompt'
          render json: {
            html_block: render_to_string(partial: 'shared/request_or_offer_form')
          }, status: :ok
        else
          render json: {
            user: resource
          }, status: :ok
        end
      else
        render json: {
          message: 'Sorry, bad request',
          errors: resource.errors.full_messages
        }, status: :bad_request
      end
    end

  end
end
