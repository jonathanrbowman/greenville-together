ActiveAdmin.register User do
  menu if: proc { current_user.is_admin }

  permit_params :email, :password, :password_confirmation

  controller do

    def create
      new_user = User.new(
        email: params[:user][:email],
        password: params[:user][:password],
        password_confirmation: params[:user][:password_confirmation]
      )

      if new_user.save
        render json: {
          message: 'User created successfully',
          user: new_user
        }, status: :ok
      else
        render json: {
          message: 'Sorry, bad request',
          errors: new_user.errors.full_messages
        }, status: :bad_request
      end
    end

  end

  index do
    selectable_column
    id_column
    column :email
    column :current_sign_in_at
    column :sign_in_count
    column :created_at
    actions
  end

  filter :email
  filter :current_sign_in_at
  filter :sign_in_count
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :password
      f.input :password_confirmation
    end
    f.actions
  end

end
