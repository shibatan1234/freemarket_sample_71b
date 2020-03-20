class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.integer :postcode, null: false
      t.string :prefecture, null: false
      t.string :city, null: false
      t.string :address, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
  end
end
