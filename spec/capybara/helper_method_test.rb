require_relative 'spec_helper.rb'

feature "can click a card and get its value" do
  before do
    create_room("jnmandal")
    deal_cards(5)
  end
  scenario "prints card value" do
    sleep 2
    print click_card(1)
  end
end