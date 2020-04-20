class CreateJoinTableForRequestedServices < ActiveRecord::Migration[5.2]
  def self.up
    create_table :requested_services do |t|
      t.integer :service_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end

    add_index :requested_services, %i[service_id user_id], unique: true
  end

  def self.down
    remove_index :requested_services, %i[service_id user_id]
    drop_table :requested_services
  end
end
