class CreateContracts < ActiveRecord::Migration[6.0]
  def change
    create_table :contracts do |t|
      t.references :client, null: false, foreign_key: true
      t.references :partner, null: false, foreign_key: true

      t.timestamps
    end
  end
end
