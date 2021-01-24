class AddRegistrationDataToPartner < ActiveRecord::Migration[6.0]
  def change
    add_column :partners, :registration_data, :text, array: true, default: []
  end
end
