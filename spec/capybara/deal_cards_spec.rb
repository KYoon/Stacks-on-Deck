require_relative 'spec_helper.rb'


feature "can deal cards" do
  before do
    create_and_join_room("jnmandal", "bsheridan12")
  end

  scenario "allows you to choose amount of cards dealt" do
    in_browser(:one) do
      expect(page).to have_field "initial-deal-count"
    end
  end

  scenario "deal cards button deals cards" do
    in_browser(:one) do
      deal_cards(4)
      within "div.player-hand" do
        expect(page).to have_selector ".card"
      end
    end
  end

  scenario "dealt cards viewable by other user" do
    in_browser(:one) do
      deal_cards(4)
    end
    in_browser(:two) do
      within "div.player-hand" do
        expect(page).to have_selector ".card"
      end
    end
  end

  scenario "does not deal cards when user enters 0" do
    in_browser(:one) do
      deal_cards(0)
    end
    in_browser(:two) do
      within "div.player-hand" do
        page.assert_no_selector(".card")
      end
    end
  end
  
  scenario "deals correct number of cards" do
    in_browser(:one) do
      deal_cards(5)
      within "div.player-hand" do
        page.assert_selector(".card", count: 5)
      end
    end
  end
end