class AddServices < ActiveRecord::Migration[5.2]
  def self.up
    create_table :services do |t|
      t.integer :user_id, null: false
      t.string :title, default: '', null: false
      t.text :description, default: '', null: false
      t.integer :status, default: 0, null: false
      t.integer :terms, default: 0, null: false
      t.boolean :is_offering, default: true, null: false
      t.timestamps
    end

    add_index :services, :user_id, unique: true
  end

  def self.down
    remove_index :services, :user_id
    drop_table :services
  end
end
