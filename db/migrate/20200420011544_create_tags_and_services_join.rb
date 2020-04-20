class CreateTagsAndServicesJoin < ActiveRecord::Migration[5.2]
  def self.up
    create_table :tags do |t|
      t.string :title, default: '', null: false
      t.text :description
      t.timestamps
    end

    create_table :services_tags do |t|
      t.integer :service_id, null: false
      t.integer :tag_id, null: false
      t.timestamps
    end

    add_index :services_tags, %i[service_id tag_id], unique: true
  end

  def self.down
    remove_index :services_tags, %i[service_id tag_id]
    drop_table :services_tags
    drop_table :tags
  end
end
