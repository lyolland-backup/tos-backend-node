class CreateUserPapers < ActiveRecord::Migration[5.2]
  def change
    create_table :user_papers do |t|
      t.references :user, foreign_key: true
      t.references :paper, foreign_key: true

      t.timestamps
    end
  end
end
