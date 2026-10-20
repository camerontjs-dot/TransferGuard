# Try TransferGuard yourself

This package is a synthetic personal-practice prototype, not a real migration tool.

**Open `demo/TransferGuard-Try-Me.html` in Chrome in a desktop-width window.** No server or installation is needed for the page. If opening it shows source text, save the HTML file and open the saved file with Chrome.

1. Select **Healthy transfer**, then **Run comparison**.
2. Try **Same count, missing note** and investigate the missing item.
3. Try **Link points to the wrong note** and expand the relationship table.
4. Under **Export / import practice**, download the original sample, select the saved JSON file, then run the comparison again.

Try **Not enough evidence** as well. It must not look like an all-clear. Expected results are behind a reveal control on the page.

Use only the supplied synthetic examples. The page does not connect to Jira, Evernote, or a live account. Selecting a file reads it into this page's temporary practice workspace, not into another app. Download buttons request a save through your browser; nothing is sent automatically.

For agents, start at `skills/transferguard-demo/SKILL.md`, then run `node demo/cli.cjs describe` from this package's root. Node 22+ is needed only for the CLI and tests, with no npm install.

Known gap: the native browser test completed the desktop scenarios and saved-file round trip but found a 390-pixel layout overflow. The CSS correction has not been replayed. Your personal test and an independent language-model agent trial have not happened yet.

See `docs/DEMO.md` for instructions and `docs/DEMO-VERIFICATION.md` for exact test boundaries. `PACKAGE-MANIFEST.json` binds the delivered files to the source and generated page; it is an integrity list, not an authenticity signature.

After trying it, the useful feedback is: what was confusing, whether the relationship findings made sense, and whether the export/import steps were obvious. The page can save a local feedback questionnaire; it does not submit it.
