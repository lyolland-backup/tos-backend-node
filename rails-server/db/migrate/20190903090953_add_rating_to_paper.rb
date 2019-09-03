class AddRatingToPaper < ActiveRecord::Migration[5.2]
  def change
    add_column :papers, :rating, :integer
  end
end
