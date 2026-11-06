FROM ruby:3.3

ENV BUNDLE_GEMFILE=/usr/local/bundle/Gemfile

WORKDIR /site

COPY Gemfile ${BUNDLE_GEMFILE}
RUN bundle install

COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host=0.0.0.0", "--port=4000", "--livereload", "--baseurl", ""]
