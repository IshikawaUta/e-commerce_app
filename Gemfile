source "https://rubygems.org"

# Versi Jekyll yang digunakan
gem "jekyll", "~> 4.3.2"

# Plugin penting untuk SEO dan RSS Feed
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-sitemap"
end

# Webrick diperlukan untuk Ruby versi 3.0 ke atas (Sangat penting agar tidak error saat 'jekyll serve')
gem "webrick", "~> 1.7"

# Dukungan untuk Windows (MingW, dsb) agar tetap kompatibel di berbagai OS
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Booster performa untuk Windows saat watching file
gem "wdm", "~> 0.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Pengunci versi http_parser untuk JRuby
gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]