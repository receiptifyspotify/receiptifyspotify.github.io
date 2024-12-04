source "https://rubygems.org"

# Jekyll version
gem "jekyll", "~> 4.3.4"

# Theme
gem "minima", "~> 2.5"

# Jekyll Admin for CMS
gem "jekyll-admin"

# Plugins
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

# Windows and JRuby settings
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance booster for Windows
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock http_parser.rb version on JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

gem "rack"
gem "webrick"