function f = plot_compendium(Hs, Tp, Dp, time, options)
%PLOT_COMPENDIUM Creates subplots of wave height, peak period and direction
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%   Creates subplots showing: Significant Wave Height (Hs),
%   Peak Period (Tp), and Direction (Dp). Developed based on:
%   http://cdip.ucsd.edu/themes/media/docs/documents/html_pages/compendium.html
%   
%   Parameters
%   ----------
%       Hs: double array
%           significant wave height
%       Tp: double array
%           peak period
%       Dp: double array
%           direction
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
    Tp (1,:) double
    Dp (1,:) double
    time (1,:) datetime
    options.buoy_title string = "";
end

title_text = sprintf("%s to %s", ...
    datestr(time(1), 'yyyy-mm-dd'), ...
    datestr(time(end), 'yyyy-mm-dd'));

% Create figure window
f = figure('Name', 'Compendium');
f.Position(3:4) = 2 * f.Position(3:4);          % double default size
movegui(f, 'center');

% Hs subplot
ax1 = subplot(3, 1, 1);
yyaxis left
plot(time, Hs);
ylim([0 8])
title(title_text, "FontSize", 14)
grid on
ylabel('Hs [m]', "FontSize", 13)
set(ax1, 'xticklabel', [], 'Ycolor', 'k')
ylim_left = ylim;
yyaxis right                                    % add right y-axis
ft_in_meters = 3.28084;
set(ax1, 'ylim', ft_in_meters * ylim_left, 'Ycolor', 'k')
ylabel('Hs [ft]', "FontSize", 14)

% Tp subplot
ax2 = subplot(3, 1, 2);
plot(time, Tp);
ylim([0 28])
grid on
set(ax2, 'xticklabel', [])                      % hide x-axis labels
ylabel('Tp [s]', "FontSize", 13)

% Dp subplot
ax3 = subplot(3, 1, 3);
scatter(time, Dp, 6, "filled");
ylim([0 360])
yticks(0:90:360)
grid on
xlabel('Date', "FontSize", 13)
ylabel('Dp [deg]', "FontSize", 13)

% Add super title over all sublots
if options.buoy_title ~= ""
    sgtitle(options.buoy_title, "FontSize", 20)
end

hold off
