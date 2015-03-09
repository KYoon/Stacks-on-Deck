require 'capybara/rspec'
require_relative 'test_methods.rb'
Capybara.default_driver = :selenium
Capybara.app_host = 'localhost:3000'

feature "splash page" do 
  before do
    in_browser(:one) do
      visit "/"
    end
  end
  
  scenario "has app name" do
    in_browser(:one) do
      expect(page).to have_content("Stacks on Deck")
    end
  end

  scenario "has Create Room button" do
    in_browser(:one) do
      expect(page).to have_button("Create Room")
    end
  end

  scenario "has Join Game button" do
    in_browser(:one) do
      expect(page).to have_button("Join Room")
    end
  end
end

feature "create room" do 
  scenario "can navigate to room page" do
    in_browser(:one) do
      create_room("blehg")
      expect(page).to have_content "You are in the room"
    end
  end

  scenario "entered username present on room page" do
    in_browser(:one) do
      create_room("lil' brye brye")
      expect(page).to have_content "lil' brye brye"
    end
  end
end

feature "join existing room" do
  scenario "can see other users in room" do
    create_and_join_room("jnmandal", "bsheridan12")
    in_browser(:one) do
      expect(page).to have_content "bsheridan12"
    end
    in_browser(:two) do
      expect(page).to have_content "jnmandal"
    end
  end
end

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

