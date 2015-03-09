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
    expect(page).to have_button("Pass Card")
  end

  scenario "has Play Card button" do
    expect(page).to have_button("Play Card")
  end

  scenario "has Discard Card button" do
    expect(page).to have_button("Discard Card")
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


# Need to add helper that returns the clicked card so
# we can ensure the correct card is played and displayed for both players.
feature "a user plays a card" do
  before do
    create_and_join_room("jnmandal", "bsheridan12")
    in_browser(:one) do
      deal_cards(5)
      find('div:nth-child(3) > .card').click
      click_button("Play Card")
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
      click_button("Discard Card")
    end
  end

end



