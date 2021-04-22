FROM apache/superset
# Switching to root to install the required packages
USER root
# Example: installing the MySQL driver to connect to the metadata database
RUN pip install mysqlclient
# Example: installing a driver to connect to Redshift
# Find which driver you need based on the analytics database
# you want to connect to here:
# https://superset.apache.org/installation.html#database-dependencies
RUN pip install sqlalchemy-redshift
# PyAthenaJDBC is a Python DB 2.0 compliant wrapper for the Amazon Athena JDBC driver.
RUN pip install PyAthenaJDBC
RUN pip install "apache-superset[athena]"

# Add a script to be executed every time the container starts.
COPY docker-entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/docker-entrypoint.sh
# Switching back to using the `superset` user
USER superset

ENTRYPOINT ["docker-entrypoint.sh"]



