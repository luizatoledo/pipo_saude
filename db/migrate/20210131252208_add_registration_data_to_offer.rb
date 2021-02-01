class AddRegistrationDataToOffer< ActiveRecord::Migration[6.0]
  def change
    add_column :offers, :registration_data, :text, array: true, default: []
  end
end
