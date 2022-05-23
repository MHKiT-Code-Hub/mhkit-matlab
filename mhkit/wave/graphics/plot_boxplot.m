function f = plot_boxplot(Hs, time, options)
%PLOT_BOXPLOT Creates monthly-averaged boxplots of significant wave height
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%   Creates monthly-averaged boxplots of significant wave height (Hs)
%   Developed based on:
%   http://cdip.ucsd.edu/themes/media/docs/documents/html_pages/annualHs_plot.html
%   
%   Parameters
%   ----------
%       Hs: double array
%           significant wave height
%       time: datetime array
%           timestamps
%       buoy_title: string (optional)
%           figure suptitle (super title)
%   
%   Returns
%   -------
%       f : figure object
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

arguments
    Hs (1,:) double
    time (1,:) datetime
    options.buoy_title string = "";
end

% Format data into a table
months = categorical(month(time));
time = time(:);                           % ensure column vector
months = months(:);                                 % ensure column vector
Hs = Hs(:);                                         % ensure column vector
data_table = table(time, months, Hs);
warning('off', 'MATLAB:table:ModifiedVarnamesUnstack')
unstacked_table = unstack(data_table, 'Hs', 'months');
warning('on', 'MATLAB:table:ModifiedVarnamesUnstack')
data_array = table2array(unstacked_table(:,2:end));  % exclude timestamps

% Create figure window
f = figure('Name', 'Boxplot');
f.Position(3) = f.Position(4) * 0.833;              % change aspect ratio
f.Position(3:4) = 2 * f.Position(3:4);              % double overall size
movegui(f, 'center');                               % center on screen


% Main boxplots
ax1 = subplot(2, 1, 1);
bplot(data_array, 'outliers', 'width', 0.6);
xlim([0.4 12.6])
xticks(1:12)
grid on
ylabel('Significant Wave Height, Hs (m)', 'FontSize', 12)
names = {'Jan'; 'Feb'; 'Mar'; 'Apr'; 'May'; 'Jun';
         'Jul'; 'Aug'; 'Sep'; 'Oct'; 'Nov'; 'Dec'};
set(gca, 'xtick', [1:12], 'xticklabel', names);
title('Significant Wave Height by Month', 'FontSize', 16)
box on

% Add annotations to main boxplot figure
% Counts:
counts = num2str(countcats(months));
ypos_counts = ax1.YLim(2) * 0.99;
text(1:12, repmat(ypos_counts, 1, 12), counts, ...
    'VerticalAlignment', 'top', ...
    'HorizontalAlignment', 'center');
% Means:
wrapper_fun = @(x) mean(x, 'omitnan');
means = table2array(varfun(wrapper_fun, unstacked_table(:, 2:end)));
wrapper_fun = @(x) num2str(x, '%.2f');
means_text = arrayfun(wrapper_fun, means, 'UniformOutput', 0);
text(1:12, means, means_text, ...
    'Color', [0 0.6 0], ...
    'VerticalAlignment', 'bottom', ...
    'HorizontalAlignment', 'center');


% Sample 'legend' boxplot
ax2 = subplot(2, 1, 2);
sample_data = randn(500,1) * 0.5 + 2.5;     % std.dev=0.5, median=2.5
sample_data = cat(1, sample_data, repmat(max(sample_data), 30, 1));  % skew
sample_data = cat(1, sample_data, max(sample_data)*1.1);   % ensure outliers
sample_data = cat(1, sample_data, max(sample_data)*1.102); % ensure outliers
bplot(sample_data, 'horiz', 'outliers');
title('Sample Boxplot', 'FontSize', 9)
set(gca, 'xtick', [])
set(gca, 'ytick', [])
box on

% Add annotations to sample 'legend' boxplot
ypos_upper = 0.45;
ypos_lower = -0.25;
font_size = 9;
text(mean(sample_data), ypos_lower, 'Mean', ...
    'Color', [0 0.6 0], ...
    'FontSize', font_size, ...
    'FontWeight', 'bold', ...
    'VerticalAlignment', 'top', ...
    'HorizontalAlignment', 'left');
text(median(sample_data), ypos_lower, 'Median', ...
    'Color', [0.6350, 0.0780, 0.1840], ...
    'FontSize', font_size, ...
    'VerticalAlignment', 'top', ...
    'HorizontalAlignment', 'right');
text(max(sample_data), mean([ypos_upper ypos_lower]), 'Outliers', ...
    'Color', [0.9684    0.2799    0.0723], ...
    'FontSize', font_size, ...
    'VerticalAlignment', 'top', ...
    'HorizontalAlignment', 'right');
text(prctile(sample_data, 25), ypos_upper, '25%ile', ...
    'FontSize', font_size, ...
    'VerticalAlignment', 'top', ...
    'HorizontalAlignment', 'center');
text(prctile(sample_data, 75), ypos_upper, '75%ile', ...
    'FontSize', font_size, ...
    'VerticalAlignment', 'top', ...
    'HorizontalAlignment', 'center');

% Resize subplots
ax2.Position(4) = ax2.Position(4) * 0.4;            % shrink bottom plot
ax1.Position(2) = ax1.Position(2) * 0.55;           % move top plot down
ax1.Position(4) = ax1.Position(4) * 1.7;            % grow top plot

% Add super title over all sublots
if options.buoy_title ~= ""
    sgtitle(options.buoy_title, "FontSize", 20)
end

hold off


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function yi = prctile(X,p)
%PRCTILE Returns data percentile
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
x = X(:);
n = length(x);
x = sort(x);
Y = 100*(.5:1:n-.5)/n;
x = [min(x); x; max(x)];
Y = [0 Y 100];
yi = interp1(Y,x,p);
