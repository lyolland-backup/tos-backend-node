class AddCategoryToPaper < ActiveRecord::Migration[5.2]
  def change
    add_column :papers, :category, :string
  end
end
