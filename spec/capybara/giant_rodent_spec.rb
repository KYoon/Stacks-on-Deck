require_relative 'spec_helper.rb'

feature "a user clicks card in hand" do
  before do
    create_room("jnmandal")
    deal_cards(5)
    find('div:nth-child(3) > .card').click
  end

  scenario "has Draw Card button" do
    expect(page).to have_button("Draw Card")
  end

  scenario "has Pass Card button" do
    expect(page).to have_button("Pass")
  end

  scenario "has Play Card button" do
    expect(page).to have_button("Play")
  end

  scenario "has Discard Card button" do
    expect(page).to have_button("Discard")
  end
end

feature "a user draws a card" do
  before do
    create_room("jnmandal")
    deal_cards(5)
    find('div:nth-child(3) > .card').click
    click_button("Draw Card")
  end

  scenario "card is passed to player's hand" do
    page.assert_selector(".card", count: 6)
  end
end

feature "a user plays a card" do
  before do
    create_and_join_room("jnmandal", "bsheridan12")
    in_browser(:one) do
      deal_cards(5)
      click_card(3)
      click_button("Play")
    end
  end

  scenario "card is removed from player hand" do
    in_browser(:one) do
      within "div.player-hand" do
        page.assert_selector(".card", count: 4)
      end
    end
  end

  scenario "selected card is moved to table" do
    in_browser(:one) do
      within "div.table-cards" do
        page.assert_selector(".card", count: 1)
      end
    end
  end

  scenario "card on table is card that was in hand" do


  end

  scenario "second user can see player card" do
    in_browser(:two) do
      within "div.table-cards" do
        page.assert_selector(".card", count: 1)
      end
    end
  end
end

feature "a user discards a card" do
  before do
    create_room("jnmandal")
    in_browser(:one) do
      deal_cards(5)
      find('div:nth-child(3) > .card').click
      click_button("Discard")
    end
  end
end



