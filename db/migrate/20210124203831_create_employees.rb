class CreateEmployees < ActiveRecord::Migration[6.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :cpf
      t.date :admission_date
      t.string :email
      t.string :adress
      t.float :weight
      t.integer :height
      t.float :meditation_hours
      t.references :client, null: false, foreign_key: true

      t.timestamps
    end
  end
end
