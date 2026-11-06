#############################################################
# Configuration
#############################################################

BUILD = build
PANDOC = pandoc
METADATA = metadata.yml

# Content, in reading order
CHAPTERS = $(sort $(wildcard md/chapters/*.md))
APPENDIX = md/appendix.md $(sort $(wildcard md/appendix/[a-h]*.md))
REFS = md/references.md
ALL_MD = $(CHAPTERS) $(APPENDIX) $(REFS)

PREP = python3 scripts/prep_pandoc.py

# Concatenate files with blank lines between them
CONTENT = awk 'FNR==1 && NR!=1 {print "\n\n"}{print}' $(ALL_MD) | $(PREP)

ARGS = --toc --toc-depth=3 --math-method=mathjax --metadata-file $(METADATA) \
       --standalone --to html5

TEMPLATE_HTML = templates/html.html
TEMPLATE_CHAPTER = templates/chapter.html

NESTED_DIR = $(BUILD)/html/c/

#############################################################
# Targets
#############################################################

.PHONY: all html nested_html clean

all: html

html: $(BUILD)/html/index.html nested_html
	@echo "html build complete"

clean:
	rm -rf $(BUILD)

# Full single-page book
$(BUILD)/html/index.html: $(ALL_MD) $(METADATA) $(TEMPLATE_HTML)
	@echo "building $@..."
	mkdir -p $(BUILD)/html
	$(CONTENT) | sed 's|\.\./\.\./figures/|figures/|g' | \
		$(PANDOC) $(ARGS) --template $(TEMPLATE_HTML) -o $@
	cp -r figures $(BUILD)/html/
	cp templates/nav.js templates/book.css $(BUILD)/html/

# Per-file nested pages (flat names under c/)
nested_html:
	@mkdir -p $(NESTED_DIR)
	@for f in $(ALL_MD); do \
		out="$(NESTED_DIR)$$(basename $$f .md).html"; \
		echo "building $$out..."; \
		cat $$f | $(PREP) | sed 's|\.\./\.\./figures/|../figures/|g' | \
			$(PANDOC) $(ARGS) --template $(TEMPLATE_CHAPTER) -o $$out; \
	done
	cp templates/nav.js templates/book.css $(NESTED_DIR)
	@echo "All nested HTML files built"
