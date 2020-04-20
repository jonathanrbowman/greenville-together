class AddOtherColumnsToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string, default: '', null: false
    add_column :users, :last_name, :string, default: '', null: false
    add_column :users, :business_name, :string, default: '', null: false
    add_column :users, :business_verified_at, :datetime
    add_column :users, :description, :text
    add_column :users, :preventative_measures, :text
    add_column :users, :avatar, :string
    add_column :users, :position, :string
    add_column :users, :availability, :text
  end
end
